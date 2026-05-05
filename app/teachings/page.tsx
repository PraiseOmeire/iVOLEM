import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TeachingsHero } from "@/components/teachings/TeachingsHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teachings | Full Life Assembly",
  description:
    "Explore teachings, devotionals, and inspirational content from Full Life Assembly.",
};

const blogPosts = [
  {
    id: 1,
    title: "Finding Peace in Uncertain Times",
    excerpt:
      "Discover how faith can be your anchor when life feels overwhelming. Learn practical ways to find peace through prayer and community.",
    date: "January 15, 2026",
    category: "Devotional",
  },
  {
    id: 2,
    title: "Upcoming Youth Camp Registration Now Open",
    excerpt:
      "Our annual summer youth camp is back! Register your teens for a week of fun, fellowship, and spiritual growth.",
    date: "January 10, 2026",
    category: "Events",
  },
  {
    id: 3,
    title: "Community Outreach: Feeding the Hungry",
    excerpt:
      "Join us this Saturday as we partner with local organizations to serve meals to those in need. Your hands can make a difference.",
    date: "January 5, 2026",
    category: "Outreach",
  },
  {
    id: 4,
    title: "New Small Group Studies Starting Soon",
    excerpt:
      "Connect with others in a meaningful way through our new small group studies. Various topics and meeting times available.",
    date: "January 1, 2026",
    category: "Community",
  },
  {
    id: 5,
    title: "Celebrating Our Church Anniversary",
    excerpt:
      "Join us as we celebrate another year of God's faithfulness. Special services and fellowship activities planned throughout the month.",
    date: "December 28, 2025",
    category: "Announcements",
  },
  {
    id: 6,
    title: "The Power of Gratitude in Your Daily Walk",
    excerpt:
      "Explore how cultivating a heart of gratitude can transform your perspective and deepen your relationship with God.",
    date: "December 20, 2025",
    category: "Devotional",
  },
];

const categoryColors: Record<string, string> = {
  Devotional: "bg-primary-light text-primary",
  Events: "bg-secondary-light text-secondary",
  Outreach: "bg-green-100 text-green-700",
  Community: "bg-purple-100 text-purple-700",
  Announcements: "bg-yellow-100 text-yellow-700",
};

export default function TeachingsPage() {
  return (
    <>
      {/* Hero Section with Image */}
      <TeachingsHero />

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Latest Posts
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        categoryColors[post.category] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <button className="text-primary font-medium hover:text-primary-dark transition-colors cursor-pointer">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" disabled>
              Load More Posts
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
