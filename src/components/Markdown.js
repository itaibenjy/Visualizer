import React, { useState, useEffect, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MDBCollapse } from 'mdb-react-ui-kit';

export default function Markdown({markdown}) {
  const [collapsed, setCollapsed] = useState({});
  const firstHeaderRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(0);

  // Split markdown text into sections by headings
  const sections = markdown.split(/(?=^#{1,6} .*$)/gm);

  // Define markdown components
  const components = {
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
          <div style={{width: "100%", maxWidth: "500px", height: "400px", display: loadedImages === 0 ? "block" : "none"}}></div>
          <img 
            src={node.properties.src} 
            alt={node.properties.alt} 
            data-loading="lazy" 
            data-orig-file={node.url} 
            style={{ width: "100%", maxWidth: "500px", display: loadedImages > 0 ? "inline" : "none" }}  
            onLoad={() => setLoadedImages(loadedImages + 1)}
          />
        </div>
      );
    }
  };




  useEffect(() => {
    // Programmatically click the first header after rendering
    if (firstHeaderRef.current) {
      firstHeaderRef.current.click();
    }
  }, []);


  // Render each section with its own toggle button
  return (
    <>
      {sections.map((section, index) => {
        const key = `section-${index}`;
        const firstLine = section.split('\n')[0];
        const restOfSection = section.replace(firstLine, '');

        // Attach the ref to the first header
        const attachRef = index === 0 ? { ref: firstHeaderRef } : {};

        return (
          <div key={key}>
            <div 
              {...attachRef}
              onClick={() => setCollapsed({...collapsed, [key]: !collapsed[key]})}
              style={{cursor: "pointer", borderBottom: "1px solid #eaeaea", paddingTop: "10px"}}
            >
              <ReactMarkdown
                className='markdown'
                children={firstLine}
                components={components}
              />
            </div>
            <MDBCollapse show={collapsed[key]}>
              <ReactMarkdown
                className='markdown'
                children={restOfSection}
                components={components}
              />
            </MDBCollapse>
          </div>
        );
      })}
    </>
  );
}