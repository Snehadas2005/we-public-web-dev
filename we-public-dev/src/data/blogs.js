/**
 * Hardcoded blog posts — replace with CMS/API later.
 * Images use files from /public for reliable builds on Linux CI.
 */

export const blogPosts = [
  {
    slug: "streamlining-workshop-operations",
    title: "Streamlining workshop operations with a single source of truth",
    excerpt:
      "How centralising jobs, parts, and customer history cuts admin time and helps your team focus on the work that pays.",
    publishedAt: "2026-03-18",
    readTime: "6 min read",
    coverImage: "/feature1.png",
    author: "Workshop Edge",
    blocks: [
      {
        type: "p",
        text: "Most workshops juggle spreadsheets, whiteboards, and a handful of apps that never quite talk to each other. The result is double entry, missed follow-ups, and staff spending evenings catching up on paperwork instead of going home.",
      },
      {
        type: "p",
        text: "A single operational system does not remove the craft from the trade — it removes the friction around it. When everyone sees the same job card, parts list, and customer notes, handovers become trivial and mistakes drop.",
      },
      {
        type: "h2",
        text: "What “single source of truth” actually means",
      },
      {
        type: "p",
        text: "It means one place where the status of a vehicle lives: quoted, approved, in progress, waiting on parts, or ready for collection. It means your service advisor and your technician are not working off different versions of the truth.",
      },
      {
        type: "figure",
        src: "/feature2.png",
        alt: "Technician reviewing a digital job board",
        caption: "Clear status at a glance keeps the floor and front desk aligned.",
      },
      {
        type: "h2",
        text: "Practical first steps",
      },
      {
        type: "ul",
        items: [
          "Pick one system and commit: pilot on one bay or one branch before rolling wide.",
          "Migrate only active jobs and open balances — archive the rest for reference.",
          "Train on real scenarios: a warranty claim, a tyre sale, and a service package.",
        ],
      },
      {
        type: "p",
        text: "The shops that see the fastest payoff are the ones that treat software as part of the workflow, not an add-on. Block time on the calendar, assign a champion, and measure time saved after thirty days.",
      },
    ],
  },
  {
    slug: "customer-communication-that-builds-trust",
    title: "Customer communication that builds trust (without burning out your front desk)",
    excerpt:
      "SMS, email, and in-app updates can reduce phone tag — if you use them consistently and keep messages human.",
    publishedAt: "2026-03-05",
    readTime: "5 min read",
    coverImage: "/feature3.png",
    author: "Workshop Edge",
    blocks: [
      {
        type: "p",
        text: "Customers do not mind waiting when they know what is happening. Silence breeds anxiety and unnecessary calls. Predictable, concise updates turn a long job into an informed wait.",
      },
      {
        type: "figure",
        src: "/feature4.png",
        alt: "Service advisor speaking with a customer",
        caption: "Short, honest updates beat long explanations customers skim anyway.",
      },
      {
        type: "h2",
        text: "Templates that still sound like you",
      },
      {
        type: "p",
        text: "Start from three templates: vehicle received, additional work required (with price), and ready for collection. Personalise the first line with the customer name and vehicle, then send. Consistency saves time; a human opener saves relationships.",
      },
      {
        type: "h2",
        text: "When to pick up the phone",
      },
      {
        type: "p",
        text: "Safety items, large variances from estimate, or anything that affects whether they can drive the car tomorrow — those deserve a voice call. Everything else can usually move faster in text with a link to approve.",
      },
      {
        type: "ul",
        items: [
          "Batch non-urgent SMS at predictable times so customers are not pinged all day.",
          "Include photos of worn parts when recommending replacement — trust goes up.",
          "Log every outbound touch on the job so any staff member can continue the thread.",
        ],
      },
    ],
  },
  {
    slug: "inventory-and-parts-discipline",
    title: "Inventory and parts discipline for growing multi-bay shops",
    excerpt:
      "Stock-outs and emergency supplier runs eat margin. A few habits keep shelves honest as you add capacity.",
    publishedAt: "2026-02-14",
    readTime: "7 min read",
    coverImage: "/feature5.png",
    author: "Workshop Edge",
    blocks: [
      {
        type: "p",
        text: "Growth feels great until you are buying the same filter three times from three suppliers because nobody updated the shelf count. Parts discipline is boring on purpose — it is what keeps gross profit from leaking.",
      },
      {
        type: "h2",
        text: "Minimum and maximum levels that people actually maintain",
      },
      {
        type: "p",
        text: "Set min/max for your top forty fast movers only. Review monthly for the first quarter, then quarterly. Too many SKUs in the program guarantees the team will stop counting.",
      },
      {
        type: "figure",
        src: "/feature1.png",
        alt: "Organised parts storage in a workshop",
        caption: "Fast movers near the bay, slow stock consolidated — less walking, fewer errors.",
      },
      {
        type: "h2",
        text: "Receiving and returns",
      },
      {
        type: "p",
        text: "Scan or log every delivery against the purchase order the same day. Returns for wrong or faulty parts should carry a owner and a due date on the job board so they do not sit in a corner for six months.",
      },
      {
        type: "p",
        text: "If you run multiple branches, resist the urge to over-share stock on day one. Prove the process at the main site, then open controlled transfers with documented cut-off times.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}
