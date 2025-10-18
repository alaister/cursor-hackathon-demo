import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [newPostTitle, setNewPostTitle] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })

  const addPostMutation = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase
        .from('posts')
        .insert({ title })
        .select()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setNewPostTitle('')
    },
  })

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPostTitle.trim()) {
      addPostMutation.mutate(newPostTitle.trim())
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-6xl font-black mb-12 uppercase tracking-tight border-8 border-black p-6 bg-[#3ECF8E]">
          Posts
        </h1>

        {/* Add Post Form */}
        <form onSubmit={handleAddPost} className="mb-8">
          <div className="border-8 border-black bg-white">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="TYPE NEW POST HERE... (PRESS ENTER)"
              className="w-full p-6 text-2xl font-bold uppercase border-none outline-none bg-transparent placeholder:text-gray-400"
              disabled={addPostMutation.isPending}
            />
          </div>
        </form>

        {/* Error State */}
        {isError && (
          <div className="border-8 border-red-600 bg-red-100 p-6 mb-8">
            <p className="text-xl font-black uppercase text-red-900">
              ERROR: {error.message}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="border-8 border-black bg-gray-100 p-12 text-center">
            <p className="text-3xl font-black uppercase">LOADING...</p>
          </div>
        )}

        {/* Posts List */}
        {isSuccess && (
          <div className="space-y-6">
            {data.length === 0 ? (
              <div className="border-8 border-black bg-gray-100 p-12 text-center">
                <p className="text-2xl font-black uppercase text-gray-600">
                  NO POSTS YET
                </p>
              </div>
            ) : (
              data.map((post) => (
                <div
                  key={post.id}
                  className="border-8 border-black bg-white p-6 hover:bg-[#3ECF8E] transition-colors"
                >
                  <h2 className="text-3xl font-black uppercase mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm font-mono uppercase text-gray-600">
                    {new Date(post.created_at).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
