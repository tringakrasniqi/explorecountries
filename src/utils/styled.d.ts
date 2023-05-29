import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    elements: string;
    text: string;
    shadow: string;
  }
}
