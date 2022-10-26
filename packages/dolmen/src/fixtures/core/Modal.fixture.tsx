import { Component, createSignal } from 'solid-js';
import { Button, Group, Modal } from '../../components';
import { SizeVariant } from '../../styles';

export const $category = 'core';

const DialogDemo: Component<{ size: SizeVariant }> = props => {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open [{props.size}]</Button>
      <Modal
        size={props.size}
        open={open()}
        onClose={() => {
          setOpen(false);
        }}
        withClose
      >
        <Modal.Header>Modal Example</Modal.Header>
        <Modal.Body>
          <p>
            tlhaq DaQapmoH DeS lIj qoSDaq yaH roj waq muS 'etlh DIS qengneS 'uQ muQaghrup bIng
            qabDaq vIQIj SoS vIjegh wIgh pIH rav 'eng chav pagh
          </p>
          <p>
            mughoS tup tI'neS 'eng mubachqangbej qamHom DeS DaQID HalwI' ngor po SojHomvo' leng qep
            ngerDaq ngach 'etlh tuj qama'Hom SIH qorDu' Say'choH 'etlh
          </p>
          <p>
            ngev Qe' wuq 'ebwI'vo' Sov muyapmoH ngoQ loDHom ngab yIH qetchuq tlhegh yIH'a''e' Hon
            vIchup Hop qul wanI' rojchoHlaH loDnal
          </p>
          <p>
            Qan SIH wa'Hu' vogh yuvbej wa'leS lo' ngaS ngoQ joj ghoD Ha'DIbaH Qan ghIch ngaS pat
            batlh toSmoH wot jang be'nI' ngeb
          </p>
          <p>
            tlhegh legh po 'IH nIQHom ja' yaS teq nIQ nach vIqaS pa' lo' mumej chav Quch HIv qorDu'
            chol 'uQ poHey nejba'neS ngoD
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button color="primary" autofocus>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default () => {
  return (
    <Group gap="md">
      <DialogDemo size="xl" />
      <DialogDemo size="lg" />
      <DialogDemo size="md" />
      <DialogDemo size="sm" />
      <DialogDemo size="xs" />
    </Group>
  );
};
