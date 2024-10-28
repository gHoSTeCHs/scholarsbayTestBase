import React from "react";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import 'katex/dist/katex.min.css'

const Mdx = ({markdown}: { markdown: any }) => {

    return (
        <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex, rehypeAutolinkHeadings]}>
            {markdown}
        </Markdown>
    )

}

export default Mdx
