import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {tomorrow} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Markdown({markdown}) {
  return (
    <ReactMarkdown
      className='markdown'
      children={markdown}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              showLineNumbers
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        },
        img({node, ...props}) {  // Inline declaration for ImageRenderer
          return (
            <div className="text-center">
              <img src={node.properties.src} alt={node.properties.alt} data-loading="lazy" data-orig-file={node.url} 
                        style={{ width: "100%", maxWidth: "500px" }}  />
            </div>
          );
        }
      }}
    />
  )
}
