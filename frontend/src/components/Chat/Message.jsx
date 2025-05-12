import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ msg }) => {
  const isUser = msg.role === 'user';

  const renderMessageContent = () => {
    if (msg.type === 'code') {
      return (
        <SyntaxHighlighter language="javascript" style={oneDark} className="rounded-xl text-sm">
          {msg.content}
        </SyntaxHighlighter>
      );
    }
    return <p>{msg.content}</p>;
  };

  return (
    <div className={isUser ? 'bg-white px-3 py-3 rounded-2xl text-black' : 'bg-black px-3 py-3 rounded-2xl text-white border border-white'}>
      {renderMessageContent()}
    </div>
  );
};

export default Message;