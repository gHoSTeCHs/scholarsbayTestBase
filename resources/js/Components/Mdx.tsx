import React from "react";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import 'katex/dist/katex.min.css'

const Mdx = ({markdown}: { markdown: any }) => {

    return (
        <Markdown remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings, rehypeFormat, rehypeSlug]}>
            {markdown}
        </Markdown>
    )

}


export default Mdx
