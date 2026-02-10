'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import { planSchema } from '@/lib/schema';
import { TaskList } from '@/components/task-list';

export default function Page() {
  const { object, submit, isLoading } = useObject({
    api: '/api/generate',
    schema: planSchema,
  });

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Break It Down
          </h1>
          <p className="text-gray-500">
            Turn any vague goal into an actionable plan.
          </p>
        </div>

        {/* Input Form - UPDATED with Phase 4 Styling */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem('prompt') as HTMLInputElement;
            submit({ prompt: input.value });
            // input.value = ''; // Uncomment this if you want the input to clear automatically
          }}
          className="relative flex items-center group"
        >
          <input
            name="prompt"
            placeholder="e.g., Learn to play guitar in 3 months..."
            className="w-full px-6 py-4 text-lg bg-white rounded-full shadow-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none pr-32 transition-shadow placeholder:text-gray-400"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`
              absolute right-2 px-6 py-2.5 rounded-full font-medium transition-all
              ${isLoading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                Planning
              </span>
            ) : 'Go'}
          </button>
        </form>

        {/* The Result Component */}
        <TaskList plan={object} isLoading={isLoading} />
        
      </div>
    </main>
  );
}