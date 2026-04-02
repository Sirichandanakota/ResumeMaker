import React from 'react';
import { Zap, FileText, CheckCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <div className="bg-gray-100 py-10 text-center">

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">

        <div>
          <Zap className="mx-auto text-blue-600 mb-2" />
          <h3 className="font-bold">Fast</h3>
          <p className="text-sm text-gray-600">Build resume in minutes</p>
        </div>

        <div>
          <FileText className="mx-auto text-blue-600 mb-2" />
          <h3 className="font-bold">Professional</h3>
          <p className="text-sm text-gray-600">Clean structured templates</p>
        </div>

        <div>
          <CheckCircle className="mx-auto text-blue-600 mb-2" />
          <h3 className="font-bold">Easy</h3>
          <p className="text-sm text-gray-600">Simple user experience</p>
        </div>

      </div>

      {/* ❤️ Bottom Line */}
      <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
        Made with <Heart size={16} className="text-red-400" /> by Resume Maker Team
      </div>

    </div>
  );
}
