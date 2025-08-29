const ClubNews = ({ news = [] }) => {
  return (
    <div className="h-[50%] w-full bg-f-white rounded-2xl shadow-xl p-6">
      <h2 className="mb-6 text-4xl font-bold text-f-jet">Latest News</h2>
      <div className="flex flex-col gap-6">
        {news.map((e) => (
          <a
            key={e.url}
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e7e7e7] rounded-2xl hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="flex flex-row justify-between p-5">
              <div>
                <p className="text-2xl font-bold">{e.title}</p>
                <p>
                  {e.source} - {e.publishedAt}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 6 L16 12 L8 18"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ClubNews;
