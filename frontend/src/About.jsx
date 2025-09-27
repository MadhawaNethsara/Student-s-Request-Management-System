function About() {
      //console.log("About component rendered");
  return (
    <section className="min-h-screen flex flex-col items-center font-mono p-6 space-y-10">

      <div className="bg-[#1e1e1e]/80 rounded-xl shadow-lg max-w-2xl w-full p-8 text-white">
        <h1 className="text-4xl font-bold mb-4 text-center">About This Application</h1>
        <p className="text-lg leading-relaxed mb-6">
          This web application was developed to streamline the process of submitting, reviewing, and approving medical certificates for university examinations. 
          It was designed with user roles such as students, mentors, doctors, and committee members in mind to ensure a smooth and transparent workflow.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          The project was built using <strong>React + Vite</strong> on the frontend and can be integrated with a backend such as Node.js and MongoDB.
          Tailwind CSS is used to maintain a clean and responsive design.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          This system is a contribution to improving the digital processes within academic institutions and making document verification easier and faster.
        </p>
        <p className="text-md text-center mt-10">
          Developed by: <strong>COM PROJECT(03)-2025</strong> <br />
          Contact: <a href="mailto:yourname@domain.com" className="text-blue-400 underline">studentreqcom@gmail.com</a>
        </p>
      </div>
    </section>
  );
}

export default About;
