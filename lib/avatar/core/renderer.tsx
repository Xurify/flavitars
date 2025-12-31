import { AvatarState } from "../types";
import { resolveAvatarColors, resolveAvatarLogic } from "../../utils/avatar-resolver";
import { AvatarFilters } from "./filters";
import { AvatarLayers } from "./layers";
import { AVATAR_FILTER_PREFIX } from "./filters";

export const renderAvatarSvg = async (state: AvatarState): Promise<string> => {
  const { hairColor } = resolveAvatarColors(state);
  const { clippingY } = resolveAvatarLogic(state);

  const filterId = `${AVATAR_FILTER_PREFIX}-${state.texture}`;

  const svgContent = (
    <svg
      viewBox="5 5 90 90"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        color: "#1a1a1a",
        ...({ "--avatar-hair": hairColor } as React.CSSProperties),
      }}
    >
      <AvatarFilters filterId={filterId} clippingY={clippingY} headId={state.head} hatId={state.hat} />

      <g filter={`url(#${filterId})`}>
        <rect x="0" y="0" width="100" height="100" fill="currentColor" opacity="0.03" className="text-foreground" />
        <AvatarLayers state={state} filterId={filterId} />
      </g>
    </svg>
  );

  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(svgContent);
};
