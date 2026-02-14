"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { createDiscoverySession, updateDiscoveryAnswers, completeDiscovery } from "@/actions/discovery";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface FormData {
  goal: string;
  field: string;
  audience: string;
  platform: string;
  strengths: string;
  careerStory: string;
  knownFor: string;
}

const GOALS = [
  "Build credibility in my field",
  "Attract job opportunities",
  "Grow a business or service",
  "Establish thought leadership",
  "Build a personal brand empire",
];

const FIELDS = [
  "Technology",
  "Marketing",
  "Design",
  "Business & Entrepreneurship",
  "Education",
  "Creative & Entertainment",
  "Health & Wellness",
  "Finance",
  "Other",
];

const AUDIENCES = [
  "Industry peers & professionals",
  "Potential clients/customers",
  "Job recruiters & hiring managers",
  "My niche community",
  "General public",
];

const PLATFORMS = [
  "LinkedIn",
  "Twitter/X",
  "Instagram",
  "TikTok",
  "YouTube",
  "Personal Blog",
];

export default function DiscoveryPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    goal: "",
    field: "",
    audience: "",
    platform: "",
    strengths: "",
    careerStory: "",
    knownFor: "",
  });

  const progress = ((currentStep - 1) / 7) * 100;

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((currentStep + 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // 1. Create a discovery session
      const sessionResult = await createDiscoverySession();
      if (!sessionResult.success || !sessionResult.data) {
        console.error("Failed to create session:", sessionResult.error);
        return;
      }
      const sessionId = sessionResult.data.sessionId;

      // 2. Save answers to the session
      await updateDiscoveryAnswers(sessionId, formData as unknown as Record<string, unknown>, 7);

      // 3. Complete discovery and generate strategy
      const result = await completeDiscovery(sessionId);
      if (result.success) {
        router.push("/strategy");
      }
    } catch (error) {
      console.error("Error saving discovery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.goal;
      case 2:
        return !!formData.field;
      case 3:
        return !!formData.audience;
      case 4:
        return !!formData.platform;
      case 5:
        return formData.strengths.trim().length > 0;
      case 6:
        return formData.careerStory.trim().length > 0;
      case 7:
        return formData.knownFor.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <main className="flex-1 overflow-auto pt-6">
      <div className="px-6 max-w-2xl mx-auto">
        <PageHeader
          title="Brand Discovery"
          description="Let's uncover your unique personal brand. Answer 7 questions to get started."
        />

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Step {currentStep} of 7
            </span>
            <span className="text-sm text-slate-500">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <Card className="p-8 mb-8">
          {/* Step 1: Primary Goal */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What's your primary goal?
              </h2>
              <p className="text-slate-600 mb-6">
                Understanding your objective helps us shape your strategy.
              </p>
              <div className="space-y-3">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        goal,
                      })
                    }
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      formData.goal === goal
                        ? "border-amber-600 bg-amber-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-medium text-slate-900">{goal}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Field */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What field are you in?
              </h2>
              <p className="text-slate-600 mb-6">
                Help us understand your industry or expertise area.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {FIELDS.map((field) => (
                  <button
                    key={field}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        field,
                      })
                    }
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      formData.field === field
                        ? "border-amber-600 bg-amber-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-medium text-slate-900">{field}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Target Audience */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Who is your target audience?
              </h2>
              <p className="text-slate-600 mb-6">
                Who do you want to reach with your personal brand?
              </p>
              <div className="space-y-3">
                {AUDIENCES.map((audience) => (
                  <button
                    key={audience}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        audience,
                      })
                    }
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      formData.audience === audience
                        ? "border-amber-600 bg-amber-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-medium text-slate-900">{audience}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Platform */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What's your preferred platform?
              </h2>
              <p className="text-slate-600 mb-6">
                Where do you want to build your presence?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        platform,
                      })
                    }
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      formData.platform === platform
                        ? "border-amber-600 bg-amber-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <p className="font-medium text-slate-900">{platform}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Core Strengths */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What are your core strengths?
              </h2>
              <p className="text-slate-600 mb-6">
                List 3-5 skills or strengths you're known for (comma-separated).
              </p>
              <textarea
                value={formData.strengths}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    strengths: e.target.value,
                  })
                }
                placeholder="e.g., Product Strategy, UI/UX Design, Team Leadership"
                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          )}

          {/* Step 6: Career Story */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What story defines your career?
              </h2>
              <p className="text-slate-600 mb-6">
                Share a brief narrative about your career journey and what shaped your path.
              </p>
              <textarea
                value={formData.careerStory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    careerStory: e.target.value,
                  })
                }
                placeholder="e.g., Started as a junior designer, learned from incredible mentors, discovered my passion for solving complex product problems..."
                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                rows={5}
              />
            </div>
          )}

          {/* Step 7: Known For */}
          {currentStep === 7 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                What do you want to be known for?
              </h2>
              <p className="text-slate-600 mb-6">
                Paint a picture of your desired reputation and impact.
              </p>
              <textarea
                value={formData.knownFor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    knownFor: e.target.value,
                  })
                }
                placeholder="e.g., Being the person who helps founders build exceptional products. Known for bold ideas, deep customer empathy, and delivering results."
                className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
                rows={5}
              />
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-8">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isLoading}
            className="flex-1 bg-amber-600 hover:bg-amber-700"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {currentStep === 7
              ? isLoading
                ? "Generating Strategy..."
                : "Complete Discovery"
              : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
