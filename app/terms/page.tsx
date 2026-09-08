import type { Metadata } from "next";
import { Text } from "@chakra-ui/react";
import LegalPage, { LegalSection } from "@/components/custom/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | Saydle",
  description: "The terms that cover your use of the Saydle app.",
};

const Terms = () => {
  return (
    <LegalPage title="Terms of Use" updated="7 September 2026">
      <Text pt={"16px"} textStyle={"body_lg"} color={"dark.300"} lineHeight={1.7}>
        These terms cover your use of Saydle, the daily affirmations app.
        Creating an account means you agree to them.
      </Text>

      <LegalSection title="What Saydle is, and is not">
        <Text pt={"8px"}>
          Saydle offers daily affirmations for reflection and encouragement.
          It is a wellbeing product, <b>not a medical or mental health
          service</b>: it does not diagnose, treat, or prevent any condition,
          and it is not a substitute for professional care. If you are
          struggling, please reach out to a qualified professional or a local
          crisis line.
        </Text>
      </LegalSection>

      <LegalSection title="Your account">
        <Text pt={"8px"}>
          You must be at least 13 to use Saydle. Keep your password to
          yourself; what happens under your account is your responsibility.
          You can delete your account at any time from the Profile screen.
        </Text>
      </LegalSection>

      <LegalSection title="Subscriptions">
        <Text pt={"8px"}>
          Saydle Premium is a monthly or annual subscription, billed by Apple
          or Google at the price shown before you confirm. It renews
          automatically unless cancelled at least 24 hours before the end of
          the current period, and it is cancelled through your App Store or
          Google Play account settings. Deleting the app, or your Saydle
          account, does not cancel a subscription. Refunds are handled by the
          store you purchased through, under their policies.
        </Text>
      </LegalSection>

      <LegalSection title="Your words">
        <Text pt={"8px"}>
          Affirmations you write remain yours. You grant us only the licence
          needed to store them, show them back to you, and, if you use the
          listening features, have them read aloud to you. Do not use Saydle
          to store content that is unlawful or that harasses or harms others;
          we may refuse or remove such content and, for serious or repeated
          cases, close the account.
        </Text>
      </LegalSection>

      <LegalSection title="Our content">
        <Text pt={"8px"}>
          The affirmations Saydle writes, and the app itself (its design,
          artwork, and code) belong to Saydle. They are for your personal use,
          not for resale or redistribution.
        </Text>
      </LegalSection>

      <LegalSection title="The honest limits">
        <Text pt={"8px"}>
          Saydle is provided as it is. We work to keep it available and
          correct, but we cannot promise it will always be either, and to the
          extent the law allows, we are not liable for indirect or
          consequential losses arising from its use. Nothing in these terms
          limits rights that your local law does not allow to be limited.
        </Text>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <Text pt={"8px"}>
          If these terms change materially, the app will say so before the
          change applies to you. Questions:{" "}
          <a href="mailto:support@saydle.app">support@saydle.app</a>.
        </Text>
      </LegalSection>
    </LegalPage>
  );
};

export default Terms;
