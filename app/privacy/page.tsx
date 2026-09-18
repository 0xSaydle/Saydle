import type { Metadata } from "next";
import { Text } from "@chakra-ui/react";
import LegalPage, { LegalSection } from "@/components/custom/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Saydle",
  description:
    "What the Saydle app collects, why it collects it, and what happens to it.",
};

/**
 * Written to match what the product actually does, not a template. If the app
 * changes what it collects, this page changes first.
 */
const Privacy = () => {
  return (
    <LegalPage title="Privacy Policy" updated="7 September 2026">
      <Text
        pt={"16px"}
        textStyle={"body_lg"}
        color={"dark.300"}
        lineHeight={1.7}
      >
        Saydle is a daily affirmations app. This page explains what we collect,
        why we collect it, and what happens to it. The short version: we collect
        what the product needs to work, we sell nothing, and we show you no ads.
      </Text>

      <LegalSection title="What we collect">
        <Text pt={"8px"}>
          <b>Your account.</b> Your name, your email address, and a scrambled
          form of your password. We never store the password itself.
        </Text>
        <Text pt={"12px"}>
          <b>What you tell Saydle about yourself.</b> Your onboarding and
          profile answers: how you have been feeling, what you want to focus on,
          the tone that suits you. Sharing these is optional. They exist so your
          affirmations can be written for you rather than for everyone.
        </Text>
        <Text pt={"12px"}>
          <b>What you do in the app.</b> Affirmations you favourite or save,
          lines you write yourself, your reading streak, and preferences such as
          theme, language, reminder times, and reading voice.
        </Text>
        <Text pt={"12px"}>
          <b>Subscription status.</b> Whether you have an active subscription,
          as reported by Apple or Google. Payment details never reach us; the
          app stores handle those entirely.
        </Text>
        <Text pt={"12px"}>
          We do not collect your location, your contacts, or advertising
          identifiers, and we use no analytics or tracking tools.
        </Text>
      </LegalSection>

      <LegalSection title="Who processes it">
        <Text pt={"8px"}>
          Saydle runs on a small number of trusted service providers, and each
          receives only what its job requires.
        </Text>
        <Text pt={"12px"}>
          <b>MongoDB Atlas</b> hosts the database. <b>Google Vertex AI</b>{" "}
          writes your affirmations: it receives your profile and onboarding
          answers, and your first name if you have asked to be addressed by it.{" "}
          <b>ElevenLabs</b> turns affirmation text into audio, and receives the
          text only, never your name or account details. <b>RevenueCat</b>{" "}
          processes subscription events from Apple and Google. <b>Resend</b>{" "}
          delivers account emails such as verification codes and password
          resets.
        </Text>
        <Text pt={"12px"}>
          These providers process data on servers in the United States under
          their standard contractual clauses, and none of them is permitted to
          use your data for its own purposes.
        </Text>
      </LegalSection>

      <LegalSection title="Reminders">
        <Text pt={"8px"}>
          Daily reminders are scheduled on your device itself. We do not run a
          push notification service and cannot send anything to your phone from
          our servers.
        </Text>
      </LegalSection>

      <LegalSection title="Deleting your account">
        <Text pt={"8px"}>
          You can delete your account from the Profile screen in the app.
          Deletion is scheduled 30 days out, and signing back in at any point
          before then cancels it. After the grace period everything is
          permanently removed except one minimal record: a scrambled, unreadable
          form of your email and your billing history, kept for six years
          because financial regulation requires it.
        </Text>
      </LegalSection>

      <LegalSection title="Your rights">
        <Text pt={"8px"}>
          You can access, correct, or delete your data at any time. Most of it
          you can manage directly in the app, and all of it by writing to us. If
          you are in the EU or the UK these are your GDPR rights; we honour the
          same rights for everyone.
        </Text>
      </LegalSection>

      <LegalSection title="Children">
        <Text pt={"8px"}>
          Saydle is not directed at children under 13, and we do not knowingly
          collect their data.
        </Text>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <Text pt={"8px"}>
          If this policy changes materially, the app will say so. Questions and
          requests: <a href="mailto:support@saydle.com">support@saydle.com</a>.
        </Text>
      </LegalSection>
    </LegalPage>
  );
};

export default Privacy;
