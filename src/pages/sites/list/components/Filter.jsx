import React, { useState } from "react";
// import { useSites } from "../../../hooks/apis";
import { Tag, Input } from "antd";
// import { HeartOutlined, FileTextOutlined } from "@ant-design/icons";
// import styles from "./Sites.module.less";

const Filter = () => {
  //   const { sitesData, isLoading, isError } = useSites();
  const { CheckableTag } = Tag;
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const tagsData = ["a", "b", "c"];
  const [selectedTags, setSelectedTags] = useState([]);
  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} />
      {/* <span style={{ marginRight: 8 }}>Categories:</span> */}
      <span style={{ marginRight: 8 }}>Categories:</span>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags.indexOf(tag) > -1}
          onChange={(checked) => {
            if (checked) {
              setSelectedTags((selectedTags) => [...selectedTags, tag]);
            } else {
              setSelectedTags((selectedTags) =>
                [...selectedTags].filter((t) => t !== tag)
              );
            }
          }}
        >
          {tag}
        </CheckableTag>
      ))}
    </>
  );
};

export default Filter;
