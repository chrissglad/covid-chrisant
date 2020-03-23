import React, { useState, useEffect } from "react";

const useStats = url => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("mounting");
      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      setStats(data);
      setLoading(false);
    };
    fetchData();
  }, [url]);
  return {
    stats,
    loading,
    error
  };
};

const Statistics = ({ url }) => {
  const { stats, error } = useStats(url);
  if (!stats && !error) {
    return (
      <li>
          please wait...
      </li>
    );
  } else {
    return (
      <li>
        {stats.confirmed ? (
          <span>{stats.confirmed.value}</span>
        ) : (
          <span>Not found</span>
        )}
        {stats.recovered ? (
          <span>{stats.recovered.value}</span>
        ) : (
          <span>Not found</span>
        )}
        {stats.recovered && stats.confirmed && stats.deaths ? (
          <span>{stats.confirmed.value - stats.recovered.value - stats.deaths.value}</span>
        ) : (
          <span>Not found</span>
        )}
        {stats.deaths ? (
          <span>{stats.deaths.value}</span>
        ) : (
          <span>Not found</span>
        )}
      </li>
    );
  }
};

export default Statistics;
