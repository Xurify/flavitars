import { AvatarState } from "../types";
import { resolveAvatarColors } from "../../utils/avatar-resolver";
import { AvatarFilters } from "./filters";
import { AvatarLayers } from "./layers";
import { AVATAR_FILTER_PREFIX } from "./filters";

export const renderAvatarSvg = async (state: AvatarState): Promise<string> => {
  const { hairColor, skinTone } = resolveAvatarColors(state);
  // clippingY removed

  const filterId = `${AVATAR_FILTER_PREFIX}-${state.texture}`;

  const svgContent = (
    <svg
      viewBox="5 5 90 90"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      style={{
        // @ts-expect-error CSS custom properties
        "--avatar-hair": hairColor,
        "--avatar-skin": skinTone,
      }}
    >
      <AvatarFilters filterId={filterId} headId={state.head} hatId={state.hat} />

      <g filter={`url(#${filterId})`}>
        <rect x="0" y="0" width="100" height="100" fill="#1a1a1a" opacity="0.03" />
        <AvatarLayers state={state} filterId={filterId} />
      </g>
    </svg>
  );

  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(svgContent);
};
