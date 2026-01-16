
import { useParams } from 'react-router';


import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';

const HootDetails = () => {
  const { hootId } = useParams();
  console.log('hootId', hootId);

  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);

  // Verify the hoot state is set correctly:
  console.log('hoot state:', hoot);

  // src/components/HootDetails/HootDetails.jsx
  if (!hoot) return <main>Loading...</main>;

  // src/components/HootDetails/HootDetails.jsx
  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
      </section>
    </main>
  );
};

// src/components/HootDetails/HootDetails.jsx
export default HootDetails;
