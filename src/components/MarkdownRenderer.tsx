import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '')
      const isInline = !match && !codeString.includes('\n')

      if (isInline) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }

      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match?.[1] || 'text'}
          PreTag="div"
          customStyle={{
            borderRadius: '0.75rem',
            padding: '1.25rem',
            fontSize: '0.875rem',
            lineHeight: '1.6',
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      )
    },
    img({ src, alt, ...props }) {
      return (
        <img
          src={src}
          alt={alt || ''}
          className="rounded-xl shadow-md max-w-full"
          loading="lazy"
          {...props}
        />
      )
    },
  }

  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
