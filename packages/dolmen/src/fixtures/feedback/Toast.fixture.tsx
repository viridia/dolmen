import { Button, Stack, toast, ToastFrame } from '../../components';

export const $category = 'feedback';

function ToastDemo() {
  return (
    <>
      <Stack gap="md" alignItems="start">
        <Button
          onClick={() => {
            toast({
              title: 'Hello',
              body: 'World',
            });
          }}
        >
          Display Toast
        </Button>
        <Button
          onClick={() => {
            toast.success({
              title: 'Hello',
              body: 'World',
            });
          }}
        >
          Success Toast
        </Button>
        <Button
          onClick={() => {
            toast.info({
              title: 'Hello',
              body: 'World',
            });
          }}
        >
          Info Toast
        </Button>
        <Button
          onClick={() => {
            toast.warning({
              title: 'Hello',
              body: 'World',
            });
          }}
        >
          Warning Toast
        </Button>
        <Button
          onClick={() => {
            toast.error({
              title: 'Fatal Error',
              body: 'A toast with a very long error message that really ought to wrap to the next line.',
            });
          }}
        >
          Error Toast
        </Button>
        <Button
          onClick={() => {
            toast({
              title: 'Hello',
              body: 'World',
              placement: 'top-left',
            });
          }}
        >
          Top Left
        </Button>
        <Button
          onClick={() => {
            toast({
              title: 'Hello',
              body: 'World',
              placement: 'top-right',
            });
          }}
        >
          Top Right
        </Button>
        <Button
          onClick={() => {
            toast({
              title: 'Hello',
              body: 'World',
              placement: 'bottom-left',
            });
          }}
        >
          Bottom Left
        </Button>
        <Button
          onClick={() => {
            toast({
              title: 'Hello',
              body: 'World',
              placement: 'bottom-right',
            });
          }}
        >
          Bottom Right
        </Button>
      </Stack>
      <ToastFrame />
    </>
  );
}

export default () => <ToastDemo />;
