'use client';

import Link from 'next/link';
import React from 'react';

type Props = {
  tags?: string[];
};

// search/?target_type=posts&order=relevance&q=[личные+финансы]

export const PostTags = ({ tags }: Props) => {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className="mx-0 mt-8 lg:mx-6">
      <h3 className="mb-4">Теги:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <div
            key={tag}
            className="text-foreground-400 hover:bg-muted-foreground hover:text-background rounded-sm bg-gray-200 px-3 py-1 text-xs font-light transition-colors">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};
