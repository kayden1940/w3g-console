import React, { useState, useMemo } from "react";
// import { useSites } from "../../../hooks/apis";
import { Tag, Input, Row, Col } from "antd";
// import { HeartOutlined, FileTextOutlined } from "@ant-design/icons";
// import styles from "./Sites.module.less";

const PurposesFilter = ({ selectedPurposes, setSelectedPurposes }) => {
  const { CheckableTag } = Tag;
  // FIXME: tagsData should fetch from apis, and now that the data from apis are needed from everywhere, gonna store the results to global state.
  const tagsData = [
    "portfolio",
    "leaflet",
    "playground",
    "game",
    "artwork",
    "blog",
    "mystery",
    "service",
    "sns",
    "tool",
    "resource",
    "tutorial",
    "unknown",
  ];

  return (
    <>
      <span style={{ marginRight: 8 }}>Purposes:</span>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedPurposes.indexOf(tag) > -1}
          onChange={(checked) => {
            if (checked) {
              setSelectedPurposes((selectedPurposes) => [
                ...selectedPurposes,
                tag,
              ]);
            } else {
              setSelectedPurposes((selectedPurposes) =>
                [...selectedPurposes].filter((t) => t !== tag)
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
const TopicFilter = ({ selectedTopics, setSelectedTopics }) => {
  const { CheckableTag } = Tag;
  // FIXME: tagsData should fetch from apis, and now that the data from apis are needed from everywhere, gonna store the results to global state.
  const tagsData = [
    "music",
    "design",
    "web",
    "graphic",
    "computerScience",
    "science",
    "math",
    "editing",
    "cookery",
  ];

  return (
    <>
      <span style={{ marginRight: 8 }}>Topics:</span>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTopics.indexOf(tag) > -1}
          onChange={(checked) => {
            if (checked) {
              setSelectedTopics((selectedTopics) => [...selectedTopics, tag]);
            } else {
              setSelectedTopics((selectedTopics) =>
                [...selectedTopics].filter((t) => t !== tag)
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
const LanguageFilter = ({ selectedTopics, setSelectedTopics }) => {
  const { CheckableTag } = Tag;
  // FIXME: tagsData should fetch from apis, and now that the data from apis are needed from everywhere, gonna store the results to global state.
  const tagsData = [
    "English",
    "Cantonese",
    "Traditional Chinese",
  ];

  return (
    <>
      <span style={{ marginRight: 8 }}>Topics:</span>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTopics.indexOf(tag) > -1}
          onChange={(checked) => {
            if (checked) {
              setSelectedTopics((selectedTopics) => [...selectedTopics, tag]);
            } else {
              setSelectedTopics((selectedTopics) =>
                [...selectedTopics].filter((t) => t !== tag)
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

const Filter = () => {
  //   const { sitesData, isLoading, isError } = useSites();
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  return (
    <>
      <Row justify="start">
        <Col span={24}>
          <Search
            placeholder="Search by title, url and description."
            onSearch={onSearch}
          />
        </Col>
        <Col>
          <PurposesFilter
            selectedPurposes={selectedPurposes}
            setSelectedPurposes={setSelectedPurposes}
          />
        </Col>
        <Col>
          <TopicFilter
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
          />
        </Col>
      </Row>
    </>
  );
};

export default Filter;
