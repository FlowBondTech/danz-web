'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import {
  useCreatePostMutation,
  useGetFeedQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { FiHeart, FiImage, FiMessageCircle, FiSend, FiX } from 'react-icons/fi'

function FeedContent() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()
  const [postContent, setPostContent] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)

  const { data, loading, error, fetchMore } = useGetFeedQuery({
    variables: { limit: 20 },
    skip: !authenticated,
  })

  const [createPost, { loading: creating }] = useCreatePostMutation({
    refetchQueries: ['GetFeed'],
  })

  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  const handleCreatePost = async () => {
    if (!postContent.trim()) return

    try {
      await createPost({
        variables: {
          input: {
            content: postContent,
            is_public: true,
          },
        },
      })
      setPostContent('')
      setShowCreatePost(false)
    } catch (err) {
      console.error('Error creating post:', err)
    }
  }

  const handleLike = async (postId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikePost({
          variables: { postId },
          refetchQueries: ['GetFeed'],
        })
      } else {
        await likePost({
          variables: { postId },
          refetchQueries: ['GetFeed'],
        })
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    }
  }

  const loadMore = () => {
    if (!data?.getFeed.has_more || !data?.getFeed.cursor) return

    fetchMore({
      variables: {
        cursor: data.getFeed.cursor,
        limit: 20,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          getFeed: {
            ...fetchMoreResult.getFeed,
            posts: [...prev.getFeed.posts, ...fetchMoreResult.getFeed.posts],
          },
        }
      },
    })
  }

  if (!ready || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading feed...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400 text-xl">Error loading feed</div>
        </div>
      </DashboardLayout>
    )
  }

  const posts = data?.getFeed.posts || []

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Feed</h1>

          {/* Create Post Button */}
          {!showCreatePost && (
            <button
              onClick={() => setShowCreatePost(true)}
              className="w-full bg-bg-secondary border border-neon-purple/20 rounded-xl p-4 text-left text-text-secondary hover:border-neon-purple/40 transition-colors"
            >
              What's on your mind?
            </button>
          )}

          {/* Create Post Form */}
          {showCreatePost && (
            <div className="bg-bg-secondary border border-neon-purple/20 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">Create Post</h2>
                <button
                  onClick={() => {
                    setShowCreatePost(false)
                    setPostContent('')
                  }}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <FiX size={20} />
                </button>
              </div>

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your dance journey..."
                className="w-full bg-bg-primary border border-white/10 rounded-lg p-3 text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:border-neon-purple/50"
                rows={4}
              />

              <div className="flex items-center justify-between">
                <button className="text-text-secondary hover:text-neon-purple transition-colors">
                  <FiImage size={20} />
                </button>

                <button
                  onClick={handleCreatePost}
                  disabled={creating || !postContent.trim()}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSend size={16} />
                  {creating ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
              <p className="text-text-secondary mb-4">No posts yet. Be the first to share!</p>
              <button onClick={() => setShowCreatePost(true)} className="btn btn-primary">
                Create Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-bg-secondary border border-neon-purple/20 rounded-xl p-6"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  {post.user?.avatar_url ? (
                    <img
                      src={post.user.avatar_url}
                      alt={post.user.display_name || post.user.username || 'User'}
                      className="w-10 h-10 rounded-full object-cover border-2 border-neon-purple/50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                      {post.user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-text-primary">
                      {post.user?.display_name || post.user?.username}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-text-primary mb-4 whitespace-pre-wrap">{post.content}</p>

                {/* Post Media */}
                {post.media_url && post.media_type === 'image' && (
                  <img
                    src={post.media_url}
                    alt="Post media"
                    className="w-full rounded-lg mb-4 max-h-96 object-cover"
                  />
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleLike(post.id, post.is_liked_by_me)}
                    className={`flex items-center gap-2 transition-colors ${
                      post.is_liked_by_me
                        ? 'text-neon-pink'
                        : 'text-text-secondary hover:text-neon-pink'
                    }`}
                  >
                    <FiHeart size={20} fill={post.is_liked_by_me ? 'currentColor' : 'none'} />
                    <span>{post.likes_count}</span>
                  </button>

                  <button className="flex items-center gap-2 text-text-secondary hover:text-neon-purple transition-colors">
                    <FiMessageCircle size={20} />
                    <span>{post.comments_count}</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Load More */}
          {data?.getFeed.has_more && (
            <button onClick={loadMore} className="w-full btn btn-outline">
              Load More
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function FeedPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        </DashboardLayout>
      }
    >
      <FeedContent />
    </Suspense>
  )
}
