import { useCallback, useState } from "react";

//GET url image string
//useUniversityLogo(auth.user.education) education = "univeristy.edu"
export const useUniversityLogo = (university) => {
  const [universityLogo, setUniversityLogo] = useState("");

  const getUniversityLogo = useCallback(async () => {
    try {
      const response = await fetch(
        `https://logo.clearbit.com/${university?.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("There was an error retrieving Uni logos.");
      }
      console.log(response.url);
      setUniversityLogo(response.url);
    } catch (err) {
      console.log("There was an error getting the logo", err);
    }
  }, [university]);

  return {
    universityLogo,
    getUniversityLogo,
  };
};

export default useUniversityLogo;
