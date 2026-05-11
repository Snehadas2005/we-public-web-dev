import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../config/env";

const FALLBACK_CMS = {
  social_facebook: "#",
  social_instagram: "#",
  social_linkedin: "#",
  social_youtube: "#",
  contact_phone: "+91 6361832517",
  contact_email: "contact@dev.workshopedge.com",
  contact_address: "Bangalore, India",
};

const CmsContext = createContext({
  cmsData: FALLBACK_CMS,
  stats: null,
  loading: false,
  error: null,
});

let cachedCmsPayload = null;
let pendingCmsPromise = null;

function normalizeCmsResponse(result) {
  const mapped = Array.isArray(result?.data)
    ? result.data.reduce((acc, item) => {
        if (item?.label && typeof item.value === "string") {
          acc[item.label] = item.value;
        }
        return acc;
      }, {})
    : {};

  return {
    cmsData: { ...FALLBACK_CMS, ...mapped },
    stats: result?.stats ?? null,
  };
}

async function fetchCmsPayload() {
  if (cachedCmsPayload) return cachedCmsPayload;

  if (!pendingCmsPromise) {
    pendingCmsPromise = fetch(`${API_BASE_URL}/cms`)
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          cachedCmsPayload = normalizeCmsResponse(result);
        } else {
          cachedCmsPayload = { cmsData: FALLBACK_CMS, stats: null };
        }
        return cachedCmsPayload;
      })
      .catch(() => {
        cachedCmsPayload = { cmsData: FALLBACK_CMS, stats: null };
        return cachedCmsPayload;
      })
      .finally(() => {
        pendingCmsPromise = null;
      });
  }

  return pendingCmsPromise;
}

export function CmsProvider({ children }) {
  const [cmsState, setCmsState] = useState({
    cmsData: cachedCmsPayload?.cmsData ?? FALLBACK_CMS,
    stats: cachedCmsPayload?.stats ?? null,
    loading: !cachedCmsPayload,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    fetchCmsPayload()
      .then((payload) => {
        if (!mounted) return;
        setCmsState({
          cmsData: payload.cmsData,
          stats: payload.stats,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (!mounted) return;
        setCmsState((prev) => ({
          ...prev,
          loading: false,
          error,
        }));
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => cmsState, [cmsState]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
