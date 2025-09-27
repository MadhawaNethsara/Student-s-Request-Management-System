function Help() {
  return (
    <section className="min-h-screen flex flex-col items-center font-mono p-6 space-y-10">

      <div className="bg-[#1e1e1e]/80 rounded-xl shadow-lg max-w-4xl w-full p-8 text-white">
        <h1 className="text-4xl font-bold mb-4 text-center">Help & Instructions</h1>
        <p className="text-lg mb-6 text-center">
          This system is designed to handle the online submission and review of medical certificates for university examinations. Below are the instructions based on your role:
        </p>

        <div className="space-y-6">
          {/* Student Help Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">For Students</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-200">
              <li>Go to the Student Medical Form page.</li>
              <li>Fill in your personal details including registration number, year, level, and semester.</li>
              <li>Select your degree programme from the dropdown.</li>
              <li>Enter the subjects you missed due to medical reasons.</li>
              <li>Upload a scanned copy/photo of your medical slip issued by a certified doctor.</li>
              <li>Click on <strong>Submit</strong> to send your form for review.</li>
            </ul>
          </div>

          {/* Mentor Help Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">For Mentors</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-200">
              <li>Review the student’s entered details and uploaded medical slip.</li>
              <li>If everything is valid, click <strong>Approve</strong>. Otherwise, click <strong>Reject</strong>.</li>
              <li>Approved applications will move forward to the next review stage.</li>
            </ul>
          </div>

          {/* Doctor Help Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">For Doctors</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-200">
              <li>View the list of submitted medical forms.</li>
              <li>Click on <strong>View Form</strong> to check the student's submission.</li>
              <li>Click <strong>Approve</strong> if the medical details are valid; otherwise, click <strong>Reject</strong>.</li>
            </ul>
          </div>

          {/* Committee Help Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">For Committee Members</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-200">
              <li>Review all details provided in the student’s form and check medical history.</li>
              <li>Make the final decision using the <strong>Approve</strong> or <strong>Reject</strong> options.</li>
              <li>Once approved, the student will be notified accordingly.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300">
          For additional assistance, please contact the university IT department or your academic mentor.
        </div>
      </div>
    </section>
  );
}

export default Help;
