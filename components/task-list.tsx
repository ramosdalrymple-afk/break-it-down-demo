import { useState, useEffect } from 'react';
import { Plan } from '@/lib/schema';

interface TaskListProps {
  plan?: Partial<Plan>; 
  isLoading: boolean;
}

export function TaskList({ plan, isLoading }: TaskListProps) {
  // 1. Local state to track which tasks are checked
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // 2. Toggle function: Adds or removes an ID from the array
  const toggleTask = (taskId?: string) => {
    if (!taskId) return;
    
    setCompletedIds(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId) // Uncheck
        : [...prev, taskId]                // Check
    );
  };

  // 3. Reset state when a new plan is generating (optional, but good UX)
  useEffect(() => {
    if (isLoading) {
      setCompletedIds([]);
    }
  }, [isLoading]);

  if (!plan && !isLoading) return null;

  return (
    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="text-6xl animate-bounce-slow">{plan?.emoji || '✨'}</div>
        <h2 className="text-2xl font-bold text-gray-800">
          {plan?.goalTitle || (isLoading ? 'Planning...' : '')}
        </h2>
      </div>

      {/* The List */}
      <div className="space-y-3">
        {plan?.tasks?.map((task, index) => {
          const isCompleted = task?.id ? completedIds.includes(task.id) : false;

          return (
            <div 
              key={index}
              onClick={() => toggleTask(task?.id)}
              className={`
                group flex items-start gap-4 p-4 rounded-xl shadow-sm border transition-all duration-200 cursor-pointer
                ${isCompleted 
                  ? 'bg-gray-50 border-gray-100 opacity-60' 
                  : 'bg-white border-gray-100 hover:shadow-md hover:border-blue-200'
                }
              `}
            >
              {/* Interactive Checkbox */}
              <div className={`
                mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${isCompleted
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300 group-hover:border-blue-400'
                }
              `}>
                {isCompleted && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium transition-all ${
                    isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task?.title}
                  </h3>
                  
                  {/* Difficulty Badge */}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task?.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                    task?.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task?.difficulty}
                  </span>
                </div>
                <p className={`text-sm transition-all ${
                  isCompleted ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {task?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}