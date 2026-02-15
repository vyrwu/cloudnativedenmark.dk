import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"

const PrivacyPage: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <SEOHead title="Privacy Policy" pathname={location.pathname} />
      <div className="mx-auto max-w-6xl">
        <div className="text-primary text-base font-sans mx-2 md:mx-28 pb-12">
          <h1 className="text-4xl font-bold pt-24">Privacy Policy</h1>
          <p className="mt-16">
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collected in cloudnativedenmark.dk. This
            policy is not applicable to any information collected offline or via
            channels other than this website.
          </p>

          <h2 className="mt-8 mb-4 text-2xl">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Information we collect</h2>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information
            about you such as your name, email address, phone number, the
            contents of the message and/or attachments you may send us, and any
            other information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">How we use your information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc ml-4">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our
              partners, including for customer service, to provide you with
              updates and other information relating to the website, and for
              marketing and promotional purposes{" "}
            </li>
            <li>Send you emails </li>
            <li>Find and prevent fraud</li>
          </ul>
          <h2 className="mt-8 mb-4 text-2xl">Log Files</h2>
          <p>
            <pre className="inline">cloudnativedenmark.dk</pre> follows a
            standard procedure of using log files. These files log visitors when
            they visit websites. All hosting companies do this and a part of
            hosting services' analytics. The information collected by log files
            include internet protocol (IP) addresses, browser type, Internet
            Service Provider (ISP), date and time stamp, referring/exit pages,
            and possibly the number of clicks. These are not linked to any
            information that is personally identifiable. The purpose of the
            information is for analyzing trends, administering the site,
            tracking users' movement on the website, and gathering demographic
            information.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">
            Advertising Partners Privacy Policies
          </h2>
          <p>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of{" "}
            <pre className="inline">cloudnativedenmark.dk</pre>.
          </p>
          <p>
            Third-party ad servers or ad networks use technologies like cookies,
            JavaScript, or Web Beacons that are used in their respective
            advertisements and links that appear on cloudnativedenmark.dk, which
            are sent directly to users' browsers. They automatically receive
            your IP address when this occurs. These technologies are used to
            measure the effectiveness of their advertising campaigns and/or to
            personalize the advertising content that you see on websites that
            you visit.
          </p>
          <p>
            Note that cloudnativedenmark.dk has no access to or control over
            these cookies that are used by third-party advertisers.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Third Party Privacy Policies</h2>
          <p>
            <pre className="inline">cloudnativedenmark.dk</pre>'s Privacy Policy
            does not apply to other advertisers or websites. Thus, we are
            advising you to consult the respective Privacy Policies of these
            third-party ad servers for more detailed information. It may include
            their practices and instructions about how to opt-out of certain
            options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">
            CCPA Privacy Rights (Do Not Sell My Personal Information)
          </h2>
          <p>
            Under the CCPA, among other rights, California consumers have the
            right to:
          </p>
          <ul className="list-disc ml-4">
            <li>
              Request that a business that collects a consumer's personal data
              disclose the categories and specific pieces of personal data that
              a business has collected about consumers.
            </li>
            <li>
              Request that a business delete any personal data about the
              consumer that a business has collected.
            </li>
            <li>
              Request that a business that sells a consumer's personal data, not
              sell the consumer's personal data.
            </li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc ml-4">
            <li>
              The right to access – You have the right to request copies of your
              personal data. We may charge you a small fee for this service.
            </li>
            <li>
              The right to rectification – You have the right to request that we
              correct any information you believe is inaccurate. You also have
              the right to request that we complete the information you believe
              is incomplete.
            </li>
            <li>
              The right to erasure – You have the right to request that we erase
              your personal data, under certain conditions.
            </li>
            <li>
              The right to restrict processing – You have the right to request
              that we restrict the processing of your personal data, under
              certain conditions.
            </li>
            <li>
              The right to object to processing – You have the right to object
              to our processing of your personal data, under certain conditions.
            </li>
            <li>
              The right to data portability – You have the right to request that
              we transfer the data that we have collected to another
              organization, or directly to you, under certain conditions.
            </li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Children's Information</h2>
          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            <pre className="inline">cloudnativedenmark.dk</pre> does not
            knowingly collect any Personal Identifiable Information from
            children under the age of 13. If you think that your child provided
            this kind of information on our website, we strongly encourage you
            to contact us immediately and we will do our best efforts to
            promptly remove such information from our records.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page.
          </p>
          <p>
            Our Privacy Policy was created with the help of the Privacy Policy
            Generator.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Policy for the ticket Purchase</h2>
          <p>
            At Cloud Native Denmark, we select a ticket provider which values
            the protection of your personal information so that you can use our
            ticketing system with confidence, knowing that your personal
            information is kept secure and private.
          </p>
          <p>
            The chosen ticketing provider has created a privacy policy that
            describes how they collect, use, and protect your personal
            information. You can read and learn more about how they work to
            ensure your privacy at{" "}
            <a href="https://ticketbutler.io/privacy-policy/">
              https://ticketbutler.io/privacy-policy/
            </a>
            .
          </p>
          <h2 className="mt-8 mb-4 text-2xl">
            Policy for participants during Cloud Native Denmark Events
          </h2>
          <p>
            Cloud Native Denmark is the data controller of the processing of
            your personal data in relation to the personal data given to us when
            we deliver our products to you.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">
            Purpose of treatment of personal data
          </h2>
          <p>
            The main purpose of the processing of personal data is to be able to
            enter into contracts with you and provide you with our products and
            services. An additional purpose also entails the compliance with
            legal requirements stemming from Anti Money Laundering- and
            Bookkeeping rulesets.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Legal grounds for treatment</h2>
          <p>
            The processing of your personal data is a necessity for Cloud Native
            Denmark being able to enter into contracts with you.
          </p>
          <p dir="auto">
            After the provision of services and products, the processing will
            furthermore be necessary for Cloud Native Denmark's legitimate
            interest in being able to assess, ascertain or defend current and
            future legal ramifications.
          </p>
          <p dir="auto">
            Finally, the processing of your personal data is done in accordance
            with legal requirements stemming from The Anti Money Laundering- and
            Bookkeeping Acts.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">Categories of recipients</h2>
          <p dir="auto">
            Your personal data is passed on to collaborative partners, hereunder
            but not limited to, financial institutions, accountants, attorneys,
            and data processors.
          </p>
          <h2 className="mt-8 mb-4 text-2xl">
            Categories of recipients in third countries
          </h2>
          <p dir="auto">
            Your personal data is transferred to third countries. A third
            country is a country outside EU/EES, for instance USA. The data is
            not transferred to international organizations. An international
            organization is for instance UN, EU or NATO.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Time frame for storage
          </h2>
          <p dir="auto">
            Your personal data is ordinarily stored five years after the end of
            the contract.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Obligations
          </h2>
          <p dir="auto">
            Submission of your personal data is a prerequisite for us to be able
            to do business with you.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Rights
          </h2>
          <p dir="auto">
            Under the General Data Protection Regulation you have a number of
            rights in relation to the processing of your personal data. If you
            wish to make use of your rights, please turn to us through{" "}
            <a href="mailto:privacy@cloudnativedenmark.dk">
              privacy@cloudnativedenmark.dk
            </a>
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Right of access
          </h2>
          <p dir="auto">
            You have the right to access the personal data we process on your
            behalf, as well as to receive a copy of the data.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Right of rectification
          </h2>
          <p dir="auto">
            You have the right to have incorrect data about yourself rectified.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Right to erasure
          </h2>
          <p dir="auto">
            In special cases you have the right to request erasure of your
            personal data.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Right to restriction of processing
          </h2>
          <p dir="auto">
            In particular cases you have the right to restrict the processing of
            your personal data. If you have the right to restricted processing,
            we cannot process your personal data, unless it is for storage, with
            your consent or for the establishment, exercise or defense of a
            legal obligation or to protect a person or important public
            interests of the European Union or of a Member State.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Right to objection
          </h2>
          <p dir="auto">
            In specific situations, you have the right to object to our
            processing of your personal data.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Right to data portability
          </h2>
          <p dir="auto">
            Under certain circumstances, you have the right to receive your own
            personal data in a structured, commonly used and machine-readable
            format, as well as to transfer this data from one controller to
            another without hindrance.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Supervisory authority
          </h2>
          <p dir="auto">
            You can read more about your actual rights in the Danish supervisory
            authority Datatilsynet guide which you can find on{" "}
            <a href="http://www.datatilsynet.dk" rel="nofollow">
              www.datatilsynet.dk
            </a>{" "}
            where you also can file a complaint.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Changes to the Policy for participants during Cloud Native Denmark
            Event
          </h2>
          <p dir="auto">
            We may update our Privacy Policy for participants from time to time.
            Thus, we advise you to review this page periodically for any
            changes. We will notify you of any changes by posting the new
            Privacy Policy on this page. These changes are effective
            immediately, after they are posted on this page. Our Privacy Policy
            was created with the help of the Privacy Policy Generator and is
            inspired from policies derived from collaboration partners.
          </p>
          <h2 className="mt-8 mb-4 text-2xl" dir="auto">
            Contact Information
          </h2>
          <p dir="auto">
            In case of inquiries regarding Cloud Native Denmark's processing of
            your personal data in relation to your transactions with us, you are
            welcome to direct your questions through the same channel you
            originally communicated with us or please contact us through{" "}
            <a href="mailto:privacy@cloudnativedenmark.dk">
              privacy@cloudnativedenmark.dk
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default PrivacyPage
