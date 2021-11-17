import React, { useState, useMemo, useEffect } from "react";
// import { useSites } from "../../../hooks/apis";
import { Tag, Input, Row, Col, Card } from "antd";
import { useStats } from "../../../../hooks/apis";
import { getSortedList } from "../../../../utils";

const PurposesFilter = ({ selectedPurposes, setSelectedPurposes }) => {
  const { data: statsData } = useStats();
  const { CheckableTag } = Tag;
  const purposes = statsData?.sites?.purposes[0] ?? {};
  return (
    <>
      <span style={{ marginRight: 8 }}>Purposes:</span>
      {getSortedList(Object.keys(purposes)).map((purpose) => (
        <CheckableTag
          key={purpose}
          checked={selectedPurposes.indexOf(purpose) > -1}
          onChange={(checked) => {
            if (checked) {
              setSelectedPurposes((selectedPurposes) => [
                ...selectedPurposes,
                purpose,
              ]);
            } else {
              setSelectedPurposes((selectedPurposes) =>
                [...selectedPurposes].filter((t) => t !== purpose)
              );
            }
          }}
        >
          {`${purpose}(${purposes[purpose]})`}
        </CheckableTag>
      ))}
    </>
  );
};

const TopicFilter = ({ selectedTopics, setSelectedTopics }) => {
  const { data: statsData } = useStats();
  const { CheckableTag } = Tag;

  const topics = statsData?.sites?.topics[0] ?? {};

  return (
    <>
      <span style={{ marginRight: 8 }}>Topics:</span>
      {getSortedList(Object.keys(topics)).map((topic) => (
        <CheckableTag
          key={topic}
          checked={selectedTopics.indexOf(topic) > -1}
          onChange={(checked) => {
            if (checked) {
              setSelectedTopics((selectedTopics) => [...selectedTopics, topic]);
            } else {
              setSelectedTopics((selectedTopics) =>
                [...selectedTopics].filter((t) => t !== topic)
              );
            }
          }}
        >
          {`${topic}(${topics[topic]})`}
        </CheckableTag>
      ))}
    </>
  );
};

const LanguageFilter = ({ selectedTopics, setSelectedTopics }) => {
  const { CheckableTag } = Tag;
  // FIXME: tagsData should fetch from apis, and now that the data from apis are needed from everywhere, gonna store the results to global state.
  const tagsData = ["English", "Cantonese", "Traditional Chinese"];

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

const Filter = ({ setSitesData, rawSitesData }) => {
  //   const { sitesData, isLoading, isError } = useSites();
  const { Search } = Input;
  // const onSearch = (value) => console.log(value);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    if (selectedPurposes.length == 0 && selectedTopics == 0) {
      setSitesData(rawSitesData);
    }
    if (selectedPurposes.length > 0 || selectedTopics.length > 0) {
      const filteredSiteData = rawSitesData.reduce((result, site) => {
        if (selectedPurposes.length > 0 || selectedTopics.length > 0) {
          const selectedTagsString = [
            ...selectedPurposes,
            ...selectedTopics,
          ].join(",,");
          const siteTags = [...(site?.purposes ?? []), ...(site?.topics ?? [])];
          if (new RegExp(siteTags.join("|")).test(selectedTagsString)) {
            result.push(site);
          }
        }
        return result;
      }, []);
      setSitesData(filteredSiteData);
    }
  }, [rawSitesData, selectedPurposes, selectedTopics]);

  const onSearch = (e) => {
    if (!e) return setSitesData(rawSitesData);
    setSitesData((sitesData) => {
      return sitesData.filter((site) => {
        return site.name.en.toLowerCase().includes(e.toLowerCase());
      });
    });
  };

  return (
    <>
      <Card>
        <Row justify="start">
          <Col span={24}>
            <Search placeholder="Search by title" onSearch={onSearch} />
          </Col>
          <Col span={24}>
            <PurposesFilter
              selectedPurposes={selectedPurposes}
              setSelectedPurposes={setSelectedPurposes}
            />
          </Col>
          <Col span={24}>
            <TopicFilter
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Filter;
