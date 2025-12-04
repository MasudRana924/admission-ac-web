import { CONFIG } from 'src/config-global';

import { ResumeBuilderView } from 'src/sections/resume/view/resume-builder-view';

// ----------------------------------------------------------------------

export default function ResumeBuilderPage() {
  return (
    <>
      <title>{`Resume Builder - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Create a professional resume with our easy-to-use resume builder"
      />
      <meta name="keywords" content="resume,builder,cv,template,professional" />

      <ResumeBuilderView />
    </>
  );
}

