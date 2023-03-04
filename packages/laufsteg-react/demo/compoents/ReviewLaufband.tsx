import './ReviewLaufband.css';

import { useMemo } from 'react';

import { Laufsteg } from '../../src/components';

export function ReviewLaufband(): React.ReactElement {
  const reviews = useMemo(() => {
    return [
      {
        title: 'This is a very nice libary',
        text: 'You can simply use it and it is buttery smoooooooth',
      },
      {
        title: 'What a thing!',
        text: 'Very cool product! We use it for a review carousel on our website, and we are very happy how great it is!',
      },
    ];
  }, []);

  return (
    <Laufsteg gap={'1rem'}>
      {reviews.map((review) => (
        <div className="reviewLaufbandCell">
          <strong>{review.title}</strong>
          <p>{review.text}</p>
        </div>
      ))}
    </Laufsteg>
  );
}
