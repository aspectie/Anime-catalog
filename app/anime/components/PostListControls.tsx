'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { getPosts } from '@/lib/posts'
import { PostListFilters } from './PostListFilters'
import { PostListSorter } from './PostListSorter'

export function PostListControls() {
  const [params, setParams] = useState({ limit: '20', order: 'ranked' })
  const queryClient = useQueryClient()

  const didMountRef = useRef(false)

  const onChangeHandler = (changedParams: TAnimesApiParams) => {
    setParams({ ...params, ...changedParams })
  }

  useEffect(() => {
    const updatePosts = async () => {
      const data = await getPosts(params)

      queryClient.setQueryData(['animePosts', 'infinite'], () => ({
        pages: [data]
      }))
    }

    if (didMountRef.current) {
      updatePosts()
    }

    didMountRef.current = true
  }, [params])

  return (
    <div
      className="
        flex
        justify-between
        py-6
        px-4
        sm:px-6
        lg:px-8
    "
    >
      <PostListFilters onChange={onChangeHandler} />
      <div className="ml-10">
        <PostListSorter onChange={onChangeHandler} />
      </div>
    </div>
  )
}
