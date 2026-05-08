import { NextResponse } from 'next/server';
import { getData, saveData } from '@/lib/storage';

export async function POST(req) {
  try {
    const studentsList = await req.json();

    if (!Array.isArray(studentsList)) {
      return NextResponse.json({ error: 'Data must be an array of students' }, { status: 400 });
    }

    const currentStudents = getData('students');

    // roll_no  → login ID
    // cnic     → password
    const newStudents = studentsList
      .map(s => ({
        id:       s.roll_no?.toString()  || s.id?.toString(),
        name:     s.name || `Student ${s.roll_no || s.id}`,
        password: s.cnic?.toString()     || s.password?.toString() || '123456',
        disabled: false,
      }))
      .filter(s => s.id); // require a valid ID

    const mergedStudents = [...currentStudents];
    newStudents.forEach(newS => {
      const index = mergedStudents.findIndex(s => s.id === newS.id);
      if (index !== -1) {
        // Update existing — preserve disabled status unless explicitly provided
        mergedStudents[index] = { ...mergedStudents[index], ...newS };
      } else {
        mergedStudents.push(newS);
      }
    });

    saveData('students', mergedStudents);

    return NextResponse.json({ success: true, count: newStudents.length });
  } catch (error) {
    console.error('Bulk Upload Error:', error);
    return NextResponse.json({ error: 'Failed to process bulk upload' }, { status: 500 });
  }
}