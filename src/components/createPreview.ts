export default function createPreview(issueType: string, values: any) {
  if (issueType === 'bug') {
    return createBugPreview(values);
  }
  return createFeaturePreview(values);
}

function createBugPreview({  
  steps,
  version,
  reproduction,
}: any) {
  return `

### Environment
- **tnpm version**:
- **node version**:
- **egg version**: ${version}
- **plugin name**:
- **plugin version**:
- **platform**:
- **git repo**: ${reproduction}

### Reproduction
${steps}

`.trim();
}

function createFeaturePreview({ motivation, proposal }: any) {
  return `

### What problem does this feature solve?
${motivation}

### What does the proposed API look like?
${proposal}
`.trim();
}
