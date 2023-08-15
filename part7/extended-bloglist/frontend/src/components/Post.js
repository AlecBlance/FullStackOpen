import { isValidElement } from "react";
import Avatar, { genConfig } from "react-nice-avatar";

const Post = ({ owner, content, link }) => {
  const config = genConfig(owner);
  const isAnotherPost = isValidElement(content);
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-5">
        <Avatar {...config} className="h-14 w-14 mr-5" />
        <div>
          <p className="font-semibold text-slate-200">{owner}</p>
          <p className="text-slate-500 text-sm">
            {isAnotherPost ? "added the following blog" : "authored"}
          </p>
        </div>
      </div>
      {isAnotherPost ? (
        <div className="flex items-center m-5 border border-slate-500 p-3 rounded-lg">
          {content}
        </div>
      ) : (
        <div>
          <h1 className="text-slate-200">{content}</h1>
          {link && (
            <span className="flex">
              <p className="text-slate-200 mr-2">@</p>
              <a className="text-teal-400 hover:text-teal-300" href={link}>
                {link}
              </a>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
