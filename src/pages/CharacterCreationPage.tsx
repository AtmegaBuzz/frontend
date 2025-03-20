import { addTokenCharacter, addTokenPersonality, getAgentTemplates } from "@/apis/create-token-form";
import { uploadFile } from "@/apis/file-upload";
import { authTokenAtom } from "@/atoms/global.atom";
import ImageUpload from "@/components/ImageUpload";
import IPFSFolderUploadComponent from "@/components/IPFSFolderUploadComponent";
import { useToast } from "@/hooks/toast";
import { AgentTemplate } from "@/interfaces";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface CharacterCreationPageProps {
  initialTokenData: {
    name: string;
    symbol: string;
    supply: string;
    imageUrl: string;
    description: string;
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
  } | null;
}

type CharacterType = "vtuber" | "custom";
type VoiceType = "male" | "female" | "robot" | "custom";
type PersonalityType =
  | "friendly"
  | "sarcastic"
  | "energetic"
  | "calm"
  | "informative"
  | "custom";

const CharacterCreationPage = ({
  initialTokenData,
}: CharacterCreationPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Try to get token data from location state (would be passed from ListTokenPage)
  const tokenData = location.state?.tokenData ||
    initialTokenData || { name: "", symbol: "" };

  const [agentTemplates, setAgentTemplates] = useState<AgentTemplate[]>([]);

  const [characterType, setCharacterType] = useState<CharacterType>("vtuber");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [customImage, setCustomImage] = useState<File | null>(null);

  const { toast } = useToast();

  const [authToken,] = useAtom(authTokenAtom);

  // Character name is automatically derived from token name
  const [characterName] = useState(
    tokenData.name ? `${tokenData.name} Character` : ""
  );
  const [voiceType, setVoiceType] = useState<VoiceType>("male");
  const [personalityType, setPersonalityType] =
    useState<PersonalityType>("friendly");
  const [customPersonality, setCustomPersonality] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentBio, setAgentBio] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [agentIpfsUrl, setAgentIpfsUrl] = useState("");

  const [pinataJwt, setPinataJwt] = useState("");
  const [agentPfp, setAgentPfp] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let agentImageUrl = "";
    let agentIpfsURL = "";

    if (characterType === "vtuber") {
      const selectedAgentTemplate = agentTemplates.filter(agentTemplate => agentTemplate.id === selectedTemplate);
      agentImageUrl = selectedAgentTemplate[0].agentImageUrl;
      agentIpfsURL = selectedAgentTemplate[0].agentIpfsUrl
    } else {
      agentImageUrl = agentPfp;
      agentIpfsURL = agentIpfsUrl;
    }



    const { message, statusCode } = await addTokenCharacter(authToken!, location.state.id, agentImageUrl, agentName, agentIpfsURL);

    if (statusCode !== 201 && message !== "Agent info already exists") {
      toast({
        type: "danger",
        message: message,
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }

    const resp = await addTokenPersonality(authToken!, location.state.id, voiceType, [personalityType]);

    if (resp.statusCode !== 201) {
      toast({
        type: "danger",
        message: resp.message,
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    } else {
      toast({
        type: "success",
        message: "You Agent has been created successfully!",
        duration: 3000
      });
    }

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const onIpfsUpload = (data: any) => {
    setAgentIpfsUrl(`https://ipfs.io/ipfs/${data.IpfsHash}`);
  }

  const nextStep = async () => {

    if (characterType === "custom") {
      localStorage.setItem("pinataJWT", pinataJwt);

      const ipfsResponse = await fetch(agentIpfsUrl);

      if (ipfsResponse.status !== 200) {
        toast({
          type: "danger",
          message: "Live2d Model didn't uploaded to IPFS, Try Again!",
          duration: 3000
        });
        return;
      }

      const {message, statusCode} = await uploadFile(authToken!, customImage!, "agent-pfp")

      if (statusCode !== 201) {
        toast({
          type: "danger",
          message: message,
          duration: 3000
        });
        return;
      }

      setAgentPfp(message);

    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {

    const getAgentTemplateData = async () => {

      const agentData = await getAgentTemplates(authToken!);
      setAgentTemplates(agentData);
    }

    getAgentTemplateData();

  }, [])


  // Get Pinata Jwt auth token
  useEffect(()=> {
    const pinataJWT = localStorage.getItem("pinataJWT");

    if (pinataJWT !== null) {
      setPinataJwt(pinataJWT);
    }
    
  },[])

  return (
    <section className="bg-blue-dark bg-pattern pt-24 pb-20">
      <div className="container max-w-[800px] mx-auto px-4">
        <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-10 text-left">
          <h1 className="text-center mb-6">
            Create AI Character for {tokenData.name || "Your Token"}
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Choose a visual style and personality for your AI character that
            will represent your token in live streams
          </p>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div>
                <h3>Choose Character Appearance</h3>
                <p>Select how you want your character to look.</p>

                <div className="flex gap-5 mb-8 mt-4">
                  <div
                    onClick={() => setCharacterType("vtuber")}
                    className={`flex-1 p-5 border-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${characterType === "vtuber"
                      ? "border-primary shadow-md transform -translate-y-1 bg-primary/5"
                      : "border-gray-200 hover:border-primary/40"
                      }`}
                  >
                    <img
                      src="/images/single-bot@2x.png"
                      alt="VTuber Template"
                      className="w-24 h-24 mb-2 mx-auto"
                    />
                    <h4 className="font-bold">VTuber Template</h4>
                    <p className="text-sm text-gray-600">
                      Choose from our pre-designed VTuber characters
                    </p>
                  </div>

                  <div
                    onClick={() => setCharacterType("custom")}
                    className={`flex-1 p-5 border-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${characterType === "custom"
                      ? "border-primary shadow-md transform -translate-y-1 bg-primary/5"
                      : "border-gray-200 hover:border-primary/40"
                      }`}
                  >
                    <img
                      src="/images/single-bot@2x.png"
                      alt="Custom Image"
                      className="w-24 h-24 mb-2 mx-auto"
                    />
                    <h4 className="font-bold">Custom Meme Image</h4>
                    <p className="text-sm text-gray-600">
                      Upload your own meme image to be animated
                    </p>
                  </div>
                </div>

                {characterType === "vtuber" && (
                  <div>
                    <h3>Select Template</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {agentTemplates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`border-4 rounded-lg p-4 flex flex-col h-full cursor-pointer transition-all duration-300 ${selectedTemplate === template.id
                            ? "border-primary shadow-md transform -translate-y-1 bg-primary/5"
                            : "border-gray-200 hover:border-primary/40"
                            }`}
                        >
                          <div className="flex-grow h-4/5 overflow-hidden mb-2">
                            <img
                              src={template.agentImageUrl}
                              alt={template.agentName}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="h-1/5 flex items-center justify-center">
                            <p className="m-0 font-medium text-center">{template.agentName}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {characterType === "custom" && (
                  <div>
                    <h3>Upload Your Meme Image</h3>
                    <p>
                      For best results, use a clear image with a single
                      character and minimal background.
                    </p>


                    {/* Pinata API Key */}

                    <div className="my-5">
                      <label htmlFor="symbol" className="block mb-2 font-bold">
                        Pinata JWT Token <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="symbol"
                        name="symbol"
                        value={pinataJwt}
                        onChange={(e) => setPinataJwt(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                        placeholder="eyJhbGciOiJIUzI1NiIs...."
                      />
                    </div>

                    {/* Agent PFP */}

                    <div className="my-5">
                      <label htmlFor="image-upload" className="block mb-2 font-bold">
                        Agent PFP <span className="text-red-500">*</span>
                      </label>
                      <ImageUpload onImageSelect={setCustomImage} />
                    </div>

                    <div className="mb-10">
                      <label htmlFor="folder-upload" className="block mb-2 font-bold">
                        Live2d Model Folder <span className="text-red-500">*</span>
                      </label>
                      {/* <FolderUpload /> */}
                      <IPFSFolderUploadComponent onIPFSUpload={onIpfsUpload} pinataJWT={pinataJwt} />
                    </div>

                  </div>
                )}

                <div className="flex justify-end my-5">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="primary-button"
                    disabled={
                      characterType === "vtuber"
                        ? !selectedTemplate
                        : !customImage
                    }
                  >
                    Next: Personality
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3>Character Personality</h3>
                <p>
                  Define your character's voice and personality traits to match
                  your brand.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-bold text-blue-700">
                        Character Name: {characterName || tokenData.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        Your character's name will be automatically derived from
                        your token name.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-bold">Agent Name</label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    required
                    className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                    placeholder="Degen Ren"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-bold">Agent Bio</label>
                  <textarea
                    value={agentBio}
                    onChange={(e) => setAgentBio(e.target.value)}
                    required
                    className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
                    placeholder="This bio will be used for personality and the way the agent talk | eg: Degen Ren is a bold and confident AI agent who speaks about X token and roasts of other tokens."
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-bold">Voice Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {(
                      [
                        "male",
                        "female",
                        "robot",
                        "child",
                        "custom",
                      ] as VoiceType[]
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVoiceType(type)}
                        className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${voiceType === type
                          ? "bg-primary text-white border-primary shadow-md transform -translate-y-1"
                          : "bg-white text-gray-700 border-gray-200 hover:border-primary/40"
                          }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-bold">
                    Personality Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(
                      [
                        "friendly",
                        "sarcastic",
                        "energetic",
                        "calm",
                        "informative",
                        "custom",
                      ] as PersonalityType[]
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPersonalityType(type)}
                        className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${personalityType === type
                          ? "bg-primary text-white border-primary shadow-md transform -translate-y-1"
                          : "bg-white text-gray-700 border-gray-200 hover:border-primary/40"
                          }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {personalityType === "custom" && (
                  <div className="mb-6">
                    <label
                      htmlFor="customPersonality"
                      className="block mb-2 font-bold"
                    >
                      Custom Personality Description
                    </label>
                    <textarea
                      id="customPersonality"
                      value={customPersonality}
                      onChange={(e) => setCustomPersonality(e.target.value)}
                      required
                      className="w-full p-4 rounded-xl border-2 border-gray-200 text-base min-h-[120px] resize-y focus:border-primary focus:ring focus:ring-primary/20"
                      placeholder="Describe your character's personality traits, interests, and speaking style..."
                    />
                  </div>
                )}

                <div className="flex flex-col gap-6 lg:flex-row md:flex-row justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={
                      isSubmitting ||
                      (personalityType === "custom" && !customPersonality)
                    }
                  >
                    {isSubmitting
                      ? "Creating Character..."
                      : "Create AI Character"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CharacterCreationPage;
