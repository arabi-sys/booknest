import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { id } = useParams();

  // You could fetch user data by id here, for demo:
  return (
    <div className="container my-5">
      <h2>User Profile</h2>
      <p>This is the dynamic user page for user with ID: {id}</p>
      {/* Display user info here */}
    </div>
  );
}