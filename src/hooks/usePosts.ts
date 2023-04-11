import { useQuery } from 'react-query';

function usePosts() {
  return useQuery('posts', async () => {
    const response = await fetch('https://');
    return response.json();
  });
}

export default usePosts;
