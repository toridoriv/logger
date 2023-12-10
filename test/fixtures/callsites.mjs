import { callsites } from "../../lib/callsites.mjs";

/**
 * This comment is here to test that the following callsite takes into account the
 * comments to determine the line number of a call.
 */
export const fileDetails = callsites()[0];
