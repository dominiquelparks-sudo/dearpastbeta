'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">Dear Past</h1>
          <p className="text-xl mb-8"> Create, curate, and preserve your digital legacy </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"> Get Started </Link>
            <Link href="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600"> Sign In </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2">Collect Memories</h3>
            <p className="text-gray-600"> Upload photos, letters, and moments from across your life </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-2">Build Your Story</h3>
            <p className="text-gray-600"> Organize and arrange your content into a beautiful book </p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-2">Share Your Legacy</h3>
            <p className="text-gray-600"> Export as PDF and share with loved ones </p>
          </div>
        </div>
      </div>
    </div>
  );
}