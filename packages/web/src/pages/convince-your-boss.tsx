import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"

const ConvinceYourBossPage: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <SEOHead title="Convince Your Boss" pathname={location.pathname} />
      <section className="bg-white py-8">
        <div className="mx-auto max-w-4xl px-6 text-left sm:text-justify">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Convince Your Boss
          </h1>
          <p className="text-lg text-gray-700 mx-auto mb-12 leading-relaxed">
            The Cloud Native Denmark 2026 conference is the premier technical
            event in the region for any team serious about Kubernetes and
            cloud-native technologies. Building on the success of{" "}
            <a
              href="https://2025.cloudnativedenmark.dk/"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Cloud Native Denmark 2025
            </a>{" "}
            in Aarhus and the highly acclaimed{" "}
            <a
              href="https://2024.kcddenmark.dk/"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Kubernetes Community Days Denmark 2024
            </a>
            , this year we return to Copenhagen at{" "}
            <a
              href="https://www.scandichotels.com/da/hoteller/scandic-copenhagen"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Scandic Copenhagen
            </a>{" "}
            for two packed days of technical talks and community connection. The
            mission remains the same: to share deep technical knowledge and
            build the cloud-native community.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            The ROI: What’s in It for Your Team?
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            It's not just about listening to talks; it's about finding clever
            and inspiring solutions to real business problems. Your focus at the
            conference should be on three things:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
            <li>
              <strong>Direct Problem-Solving:</strong> The conference is packed
              with technical deep dives on observability, security, CI/CD, and
              cluster management. This is your chance to find solutions to the
              specific challenges your team is facing right now.
            </li>
            <li>
              <strong>Learning from Leaders:</strong> The speaker list features
              CNCF Ambassadors and senior engineers from top-tier tech
              companies. This is a rare opportunity to learn best practices and
              implementation strategies from the experts who are defining the
              industry.
            </li>
            <li>
              <strong>Networking for Solutions:</strong> The "hallway track" is
              invaluable. You will be in a room with hundreds of other
              engineers, including those from key vendors, all working on the
              same stack.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Copenhagen: A Global Tech Gateway
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Copenhagen is not just Denmark's capital—it's a global tech gateway
            into the Nordics and Europe as a whole. With one of Europe's highest
            concentrations of tech talent and a thriving start-up ecosystem, the
            city attracts engineers and companies from around the world. The
            conference brings this international community together, offering
            unparalleled networking opportunities with professionals from across
            Europe and beyond.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Copenhagen is home to major tech companies spanning finance,
            e-commerce, gaming, and enterprise software. Industry giants like{" "}
            <strong>Danske Bank</strong>, <strong>Nordea</strong>, and{" "}
            <strong>Saxo Bank</strong> run some of the largest Kubernetes
            deployments in the Nordics. Global players like{" "}
            <strong>Microsoft</strong>, <strong>Google</strong>, and{" "}
            <strong>Unity</strong> have significant engineering presence here.
            Fast-growing scale-ups like <strong>Lunar</strong>,{" "}
            <strong>Pleo</strong>, and <strong>Templafy</strong> are pushing
            cloud-native boundaries daily. Attending means networking directly
            with engineers from these organizations, all gathered in one place.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The conference is deeply embedded in the Danish tech scene and
            supported by the community's most innovative employers—from fintech
            unicorns to established enterprises modernizing their
            infrastructure. Whether you're looking to learn from peers solving
            similar challenges or exploring future career opportunities,
            Copenhagen's vibrant tech ecosystem makes this conference uniquely
            valuable.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Getting There: Travel Logistics Made Simple
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Getting to the conference is straightforward, even for international
            attendees.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
            <li>
              <strong>Flights:</strong> Flights to{" "}
              <a
                href="https://www.cph.dk/en"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Copenhagen Airport
              </a>{" "}
              are generally available across the globe through many airlines.
            </li>
            <li>
              <strong>Train/Metro:</strong> From the Airport, you can take the
              Metro or{" "}
              <a
                href="https://www.dsb.dk/en"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                DSB
              </a>{" "}
              regional train directly to{" "}
              <a
                href="https://maps.app.goo.gl/ostUzhYxAQQmUpFQ9"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Copenhagen Central Station
              </a>
              . The venue,{" "}
              <a
                href="https://www.scandichotels.com/da/hoteller/scandic-copenhagen"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Scandic Copenhagen
              </a>
              , is just a short walk from the central station. Total journey
              time from the airport is approximately 20-30 minutes.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Your "Get Approval" Email Template
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Copy, paste, and adapt this template. It is designed to be short,
            respectful of your manager's time, and focused purely on value.
          </p>
          <div className="bg-gray-100 rounded-lg p-6 text-left">
            <pre className="whitespace-pre-wrap text-gray-800">
              <code>
                <strong>
                  Subject: Request: Approval for Cloud Native Denmark 2026
                  Conference
                </strong>
                <br />
                <br />
                Hi [Manager's Name],
                <br />
                <br />
                I am writing to request approval and budget to attend the Cloud
                Native Denmark technical conference this November 19-20 in
                Copenhagen. This is the third annual Cloud Native Denmark
                conference, run by the same passionate community organizers.
                <br />
                <br />
                My primary goal for attending is to focus on solutions for our
                [Name of Project/Initiative, e.g., Kubernetes platform
                optimization]. The conference provides direct access to experts
                and hands-on sessions covering [Specific Challenge 1, e.g.,
                container security] and [Specific Challenge 2, e.g., service
                mesh performance], allowing me to bring back actionable
                strategies we can implement directly.
                <br />
                <br />
                We will also have the opportunity to connect directly with key
                technology partners and major Danish tech employers in the
                cloud-native space.
                <br />
                <br />
                Upon my return, I will host a tech-debrief for the team to share
                all key takeaways, documentation, and proposals.
                <br />
                <br />
                Can we please discuss this next week when you have time?
                <br />
                <br />
                Thank you,
                <br />
                [Your Name]
              </code>
            </pre>
          </div>
        </div>
      </section>
    </>
  )
}

export default ConvinceYourBossPage
