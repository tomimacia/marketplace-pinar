import { Button, Flex, FormLabel, Image, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const AddImages = ({ setForm }) => {
  const [images, setImages] = useState([]);  
  const imageRef = useRef();
  const selPortada = (i) => {
    const newPortada = images[i];
    const newImgs = images.filter((_, ind) => ind !== i);
    setImages([newPortada, ...newImgs]);
  };
  const delImg = (i) => {
    const newImgs = images.filter((_, ind) => ind !== i);
    setImages([...newImgs]);
  };
  const onChangeImg = (e) => {
    const selectedFiles = e.target.files;
    setImages([...images, ...selectedFiles]);
  };
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ["Images"]: [...images],
    }));
  }, [images]);
  return (
    <>
      <FormLabel mt={5}>Imagen *</FormLabel>
      <Flex display="inline-block" flexDir="column">
        <Flex>
          <FormLabel htmlFor="file">
            <Flex>
              <Text
                cursor="pointer"
                p={2}
                borderRadius="10px"
                bgColor="gray.300"
                _hover={{ color: "white", bgColor: "blue.300" }}
              >
                Elegir una imagen
              </Text>
            </Flex>
            <Input
              pt={1}
              display="none"
              id="file"
              accept="image/*"
              type="file"
              multiple
              ref={imageRef}
              onChange={onChangeImg}
              name="Img"
            />
          </FormLabel>
          {images.length > 0 && (
            <Button onClick={() => setImages([])} ml={5} bgColor="blue.300">
              Borrar Imagenes
            </Button>
          )}
        </Flex>
        {images.length > 0 && (
          <Flex flexWrap="wrap">
            {images &&
              Array.from(images)
                .map((file) => {
                  return URL.createObjectURL(file);
                })
                .map((prv, i) => {
                  return (
                    <Flex
                      as={motion.div}
                      positionTransition
                      display="flex"
                      mr={2}
                      flexDir="column"
                      key={i}
                    >
                      <Image
                        as={motion.img}
                        whileHover={{
                          zIndex: 1,
                          position: "relative",
                          width: "200px",
                          maxWidth: "200px",
                          maxHeight: "200px",
                          height: "200px",
                        }}
                        transitionDuration={"0.1s"}
                        border={i === 0 && "3px solid blue"}
                        height={i === 0 ? "180px" : "135px"}
                        maxHeight={i === 0 ? "180px" : "135px"}
                        width={i === 0 ? "180px" : "135px"}
                        maxWidth={i === 0 ? "180px" : "135px"}
                        cursor="pointer"
                        onClick={i !== 0 ? () => selPortada(i) : null}
                        src={prv}
                        objectFit="cover"
                      />
                      {i === 0 && (
                        <Text align="center" fontWeight="bold">
                          Portada
                        </Text>
                      )}
                      <Flex align="center" flexDir="column">
                        <Button
                          mt={2}
                          bgColor="gray.300"
                          _hover={{ bgColor: "blue.200" }}
                          size="xs"
                          onClick={() => delImg(i)}
                          width="60%"
                          fontWeight="bold"
                          mb={1}
                        >
                          Borrar
                        </Button>
                      </Flex>
                    </Flex>
                  );
                })}
          </Flex>
        )}
      </Flex>
    </>
  );
};
