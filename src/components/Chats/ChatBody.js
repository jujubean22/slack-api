import React from 'react';

function ChatBody({data}) {

  const { body, created_at, sender: { id, email } } = data;

  return (
    <div>
    </div>
  );
};

export default ChatBody;