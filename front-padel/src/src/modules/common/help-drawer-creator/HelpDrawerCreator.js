import { useState } from "react";
import PropTypes from "prop-types";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { CustomTrans } from "translations/CustomTrans";

import { HelpDrawer } from "./HelpDrawer";
import { ContentGenerator } from "./ContentGenerator";

export const HelpDrawerCreator = ({ useHelpTranslation, openDrawer, setOpenDrawer }) => {
  const [slideSection, setSlideSection] = useState("");

  const t = useHelpTranslation();

  const pages = t("pages", { returnObjects: true });

  const getAllPages = (pages) =>
    pages.reduce((acc, page) => {
      acc.push(page);
      if (page.pages && Array.isArray(page.pages)) {
        acc = acc.concat(getAllPages(page.pages));
      }
      return acc;
    }, []);

  const getPageDrawer = (page) => ({
    id: page.id,
    title: page.pageTitle,
    icon: page.icon ? (
      <MuisticaIcon
        color="icon"
        variant={page.style?.iconVariant ? page.style.iconVariant : "filled"}
      >
        {page.icon}
      </MuisticaIcon>
    ) : (
      <CustomTrans>{`<svg>${page.customIcon}</svg>`}</CustomTrans>
    ),
  });

  const getAllDrawers = (pages) =>
    pages.map((page) => {
      const pageDrawer = getPageDrawer(page);
      if (page.subMenu) {
        pageDrawer.subMenu = page.subMenu.map(getPageDrawer);
      }
      return page.pages && Array.isArray(page.pages)
        ? { ...pageDrawer, subMenu: getAllDrawers(page.pages) }
        : pageDrawer;
    });

  const menu = pages.filter((page) => page.visible ?? true);
  const drawerMenu = getAllDrawers(menu);

  const slides = getAllPages(pages).reduce(
    (acc, { id, contents, pageTitle }) => ({
      ...acc,
      [id]: <ContentGenerator contents={contents} pageTitle={pageTitle} />,
    }),
    {}
  );

  return (
    <>
      {Object.keys(slides)?.length === 1 ? (
        <HelpDrawer
          currentSlide={slides[Object.keys(slides)[0]]}
          data-testid="help-drawer"
          headerTitle={t("headerTitle")}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          showSlide
        />
      ) : (
        <HelpDrawer
          contentDescription={<CustomTrans>{t("description")}</CustomTrans>}
          contentTitle={t("title")}
          currentSlide={slides[slideSection]}
          data-testid="help-drawer"
          drawerMenu={drawerMenu}
          headerTitle={t("headerTitle")}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setSlide={setSlideSection}
        />
      )}
    </>
  );
};

HelpDrawerCreator.propTypes = {
  useHelpTranslation: PropTypes.func,
  openDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
};
