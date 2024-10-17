import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const directoryPath = path.join(process.cwd(), 'public/assets/materias/lenguaje/nivel1');

  try {
    const files = await fs.readdir(directoryPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    return NextResponse.json({ files: jsonFiles });
  } catch (error) {
    console.error('Error al leer el directorio:', error);
    return NextResponse.json({ message: 'Error al leer los archivos del directorio.' }, { status: 500 });
  }
}
