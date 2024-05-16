// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    // kind: "github",
    // repo: {
    //   owner: "Bharat-bhandari",
    //   name: "oh-design-studio",
    // },
    kind: "local",
  },
  collections: {
    home_carousel: collection({
      label: "Home Carousel",
      slugField: "title",
      path: "src/content/home/homeCarousel/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        client_name: fields.text({
          label: "Client Name",
          validation: { isRequired: true },
        }),
        headline1: fields.text({
          label: "Headline 1",
          validation: { isRequired: true },
        }),
        headline2: fields.text({
          label: "Headline 2",
          validation: { isRequired: true },
        }),
        project_link: fields.text({
          label: "Project Link",
          validation: { isRequired: true },
        }),
        project_image: fields.image({
          label: "Background Image",
          directory: "/public/images/home/homeCarousal/",
          publicPath: "/images/home/homeCarousal/",
          validation: { isRequired: true },
        }),
      },
    }),

    portfolios: collection({
      label: "Portfolios",
      slugField: "title",
      path: "src/content/portfolios/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        client_name: fields.text({
          label: "Client Name",
          validation: { isRequired: true },
        }),
        headline1: fields.text({
          label: "Headline 1",
          validation: { isRequired: true },
        }),
        headline2: fields.text({
          label: "Headline 2",
          validation: { isRequired: true },
        }),
        portfolio_category: fields.multiselect({
          label: "Portfolio Category",
          options: [
            { label: "Print", value: "print" },
            { label: "Digital", value: "digital" },
            { label: "Packaging", value: "packaging" },
            { label: "Environmental", value: "environmental" },
          ],
        }),
        description: fields.text({
          label: "Description",
          validation: { isRequired: true },
        }),
        project_bg_image: fields.image({
          label: "Main Background Image",
          directory: "/public/images/portfolios/",
          publicPath: "/images/portfolios/",
          validation: { isRequired: true },
        }),
        portfolio_images: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: "/public/images/singlePortfolio/",
              publicPath: "/images/singlePortfolio/",
            }),

            width: fields.integer({
              label: "Width of Image",
              description: "Add Image width in px",
              validation: { min: 0, isRequired: true },
            }),
            height: fields.integer({
              label: "Height of Image",
              description: "Add Image height in px",
              validation: { min: 0, isRequired: true },
            }),
          }),
          {
            label: "Portfolio Images",
            description: "Add all images in sequence",
          }
        ),
      },
    }),
  },
});
