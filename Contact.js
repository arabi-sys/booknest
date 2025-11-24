export default function Contact() {
  return (
    <div className="container my-5">
      <h2>Contact Us</h2>
      <form>
        {/* Bootstrap form classes */}
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea className="form-control" rows={4}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}