import { Box, Image } from "@chakra-ui/react";
import { defaultProfile } from "../../public/images/avatars/exportAvatars";
export const ProfileImage = ({ showFunction, img, userPhoto, defaultProf }) => {
  const selectImg = () => {
    if (img) return img;
    if (userPhoto) return userPhoto;
    return defaultProfile.src;
  };
  return (
    <Box>
      <Image
        boxSize="4rem"
        borderRadius="full"
        onClick={showFunction}
        src={selectImg()}
        mr="12px"
        _hover={{ opacity: "0.8" }}
      />
    </Box>
  );
};
