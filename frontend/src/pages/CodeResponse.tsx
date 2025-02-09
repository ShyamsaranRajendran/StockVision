import React, { useEffect } from "react";
import Prism from "prismjs";

interface CodeResponseProps {
  code: string;
}

const CodeResponse: React.FC<CodeResponseProps> = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className="language-javascript">
      <code>{code}</code>
    </pre>
  );
};

export default CodeResponse;